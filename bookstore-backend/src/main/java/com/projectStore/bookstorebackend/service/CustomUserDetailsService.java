package com.projectStore.bookstorebackend.service;

import com.projectStore.bookstorebackend.entities.WebUser;
import com.projectStore.bookstorebackend.repository.WebUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {



   private WebUserRepository webUserRepository;

    public CustomUserDetailsService(WebUserRepository webUserRepository) {
        this.webUserRepository = webUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<WebUser> optional = webUserRepository.findByUsername(username);
        if (optional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        WebUser cur = optional.get();
        return User.builder().username(cur.getUsername())
                .password(cur.getPassword())
                .authorities(cur.getRole()
                        .stream()
                        .map(curRole->new SimpleGrantedAuthority(curRole.name()))
                        .collect(Collectors.toList()))
                .build();
    }

}
