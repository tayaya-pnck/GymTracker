package com.example.gymtracker.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class RegisterRequest {
    private String displayName;
    private String email;
    private String fullName;
    private String password;
}
