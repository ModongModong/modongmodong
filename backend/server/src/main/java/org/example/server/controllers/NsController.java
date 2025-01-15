package org.example.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.server.dto.NsResponseDto;
import org.example.server.service.NsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NsController {

    @Autowired
    private NsService nsService;

    @GetMapping("/api/ns/recommend/{userPk}")
    public ResponseEntity<List<NsResponseDto>> getNs(
            @PathVariable("userPk") Long userPk,
            HttpServletRequest request) {
        List<NsResponseDto> nsList = nsService.getNs(userPk, request);

        // 반려동물이 없을 경우 빈 리스트 반환
        return ResponseEntity.ok(nsList);
    }
}
