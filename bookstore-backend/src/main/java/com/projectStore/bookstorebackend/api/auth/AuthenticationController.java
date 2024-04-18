package com.projectStore.bookstorebackend.api.auth;

import com.projectStore.bookstorebackend.api.models.LoginBody;
import com.projectStore.bookstorebackend.api.models.LoginResponse;
import com.projectStore.bookstorebackend.entities.WebUser;
import com.projectStore.bookstorebackend.exceptions.InvalidWebUser;
import com.projectStore.bookstorebackend.roles.Role;
import com.projectStore.bookstorebackend.service.WebUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private WebUserService webUserService;

    private AuthenticationManager authenticationManager;


    private PasswordEncoder passwordEncoder;

    public AuthenticationController(WebUserService webUserService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.webUserService = webUserService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody WebUser registerBody){
        try{
            WebUser webUser = new WebUser();
            webUser.setEmail(registerBody.getEmail());
            webUser.setPassword(passwordEncoder.encode(registerBody.getPassword()));
            webUser.setUsername(registerBody.getUsername());
            webUser.setAddress(registerBody.getAddress());
            webUser.setRole(registerBody.getRole());

            webUserService.registerUser(webUser);


            return ResponseEntity.ok().build();
        }catch(InvalidWebUser ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody  LoginBody loginBody){
        try {
            String jwt = webUserService.logInUser(loginBody);
            if (jwt == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            List<Role> curRoles = webUserService.returnRoles(loginBody.getUsername());



            Authentication curAuthentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginBody.getUsername(), loginBody.getPassword(),curRoles.stream().map(curRole -> new SimpleGrantedAuthority(curRole.name())).collect(Collectors.toList())));
            SecurityContextHolder.getContext().setAuthentication(curAuthentication);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setJwt(jwt);
            return ResponseEntity.ok(loginResponse);
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/me")
    public WebUser me(@AuthenticationPrincipal WebUser webUser){
            return webUser;
    }

}
