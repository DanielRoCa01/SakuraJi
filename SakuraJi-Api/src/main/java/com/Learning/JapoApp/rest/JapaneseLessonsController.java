package com.Learning.JapoApp.rest;

import com.Learning.JapoApp.entities.*;

import com.Learning.JapoApp.servicies.LanguageService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class JapaneseLessonsController {

    private final LanguageService service;

    public JapaneseLessonsController(LanguageService service) {
        this.service = service;
    }

    // En JapaneseLessonsController.java

    @GetMapping("/vocabulary/{language}")
    public ResponseEntity<PageResponse<Entry>> getEntriesByLesson(
            @PathVariable String language,
            @RequestParam List<Integer> lessonNumber,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        PageResponse<Entry> response = service.getEntriesByLessons(language, lessonNumber, type, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/grammar/{language}")
    public ResponseEntity<PageResponse<Grammar>> getGrammarsByLesson(
            @PathVariable String language,
            @RequestParam List<Integer> lessonNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        PageResponse<Grammar> response = service.getGrammarsByLesson(language, lessonNumber, page, size);
        return ResponseEntity.ok(response);
    }





    @GetMapping("/search/{language}")
    public ResponseEntity<List<Entry>> searchEntries(
            @PathVariable String language,
            @RequestParam String term) {
        List<Entry> resultados = service.searchEntries(language, term);
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/lessons/{language}")
    public ResponseEntity<List<Lesson>> getLessons(@PathVariable String language) {
        return ResponseEntity.ok(service.cargarLecciones(language));
    }

    @GetMapping("/languages")
    public ResponseEntity<List<Language>> getLanguages() {
        return ResponseEntity.ok(service.getLanguages());
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getNumberOfLessons(@RequestParam String language) {
        List<Lesson> lessons = service.cargarLecciones(language);
        return ResponseEntity.ok(lessons.size());
    }

    @GetMapping("/{language}/appendix/{appendixName}")
    public JsonNode getAppendix(
            @PathVariable String language,
            @PathVariable String appendixName) throws Exception {
        return service.getAppendix(language, appendixName);
    }
}
