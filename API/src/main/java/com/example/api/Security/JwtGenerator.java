package com.example.api.Security;


import com.example.api.DTO.UserDetailDTO;
import com.example.api.Service.UserDetailService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtGenerator {
    private final Integer JWT_EXPIRATION = 60 * 60 * 24 * 7 * 1000;

    private final String SECRET_KEY = "SHOPEE";

    @Autowired
    UserDetailService userDetailService;

    public String generateToken(String email) {
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public Authentication getAuthFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        UserDetailDTO userDTO = (UserDetailDTO) userDetailService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDTO, null, userDTO.getAuthorities());
    }

    public boolean validateToken(String token) throws ExpiredJwtException, UnsupportedJwtException, SignatureException, IllegalArgumentException {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException | MalformedJwtException ex) {
            return false;
        }
    }
}

