package com.example.api.Security;



import com.example.api.Entity.ValidToken;
import com.example.api.Repository.ValidTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private ValidTokenRepository validTokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getJWTFromRequest(request);
        Optional<ValidToken> optionalValidToken = validTokenRepository.findValidTokenByToken(token);
        if (StringUtils.hasText(token)) {
            try {
                if (jwtGenerator.validateToken(token) ) {
                    Authentication authentication = jwtGenerator.getAuthFromJWT(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (RuntimeException ex) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
