package com.projectStore.bookstorebackend.security;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.projectStore.bookstorebackend.entities.WebUser;
import com.projectStore.bookstorebackend.repository.WebUserRepository;
import com.projectStore.bookstorebackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private JwtService jwtService;
    private WebUserRepository webUserRepository;

    public JwtRequestFilter(JwtService jwtService, WebUserRepository webUserRepository) {
        this.jwtService = jwtService;
        this.webUserRepository = webUserRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
       String tokenHeader = request.getHeader("Authorization");
       if(tokenHeader != null && tokenHeader.startsWith("Bearer ")){
            String token = tokenHeader.substring(7);
            try{

                if(!jwtService.isExpired(token)) {

                    String username = jwtService.getUsername(token);
                    Optional<WebUser> wu = webUserRepository.findByUsername(username);
                    if (wu.isPresent()) {
                        WebUser webUser = wu.get();
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(webUser, null,webUser.getRole()
                                .stream()
                                .map(curRole->new SimpleGrantedAuthority(curRole.name()))
                                .collect(Collectors.toList()));
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }

                }

            }catch (JWTDecodeException e){

            }
       }

        filterChain.doFilter(request,response);
    }
}
