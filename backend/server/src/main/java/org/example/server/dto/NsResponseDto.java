package org.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class NsResponseDto {
    private Long userId;
    private Long petId;
    private String petName;
    private Long nsId;
    private String nsName;
    private Integer nsPrice;
    private String nsEx;
}
