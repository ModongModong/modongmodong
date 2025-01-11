package org.example.server.controllers;

import org.example.server.dto.NsResponseDto;
import org.example.server.service.NsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NsController {

    private final NsService nsService;

    public NsController(NsService nsService) {
        this.nsService = nsService;
    }

    @GetMapping("/api/ns/recommend/{userPk}")
    public ResponseEntity<List<NsResponseDto>> getNs(@PathVariable Long userPk) {
        List<NsResponseDto> nsList = nsService.getNs(userPk);

        // 반려동물이 없을 경우 빈 리스트 반환
        return ResponseEntity.ok(nsList);
    }
}
