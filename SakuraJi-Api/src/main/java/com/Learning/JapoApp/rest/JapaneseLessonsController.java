package com.Learning.JapoApp.rest;

import com.Learning.JapoApp.entities.Entry;
import com.Learning.JapoApp.entities.Grammar;
import com.Learning.JapoApp.entities.Language;
import com.Learning.JapoApp.entities.Lesson;

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

    @GetMapping("/vocabulary/{language}/{lessonNumber}")
    public ResponseEntity<Lesson> getEntriesByLesson(
            @PathVariable String language,
            @PathVariable int lessonNumber,
            @RequestParam(required = false) String type) {

        Lesson filteredEntries = service.getEntriesByLesson(language, lessonNumber);
        return ResponseEntity.ok(filteredEntries);
    }

    @GetMapping("/grammar/{language}/{lessonNumber}")
    public ResponseEntity<Lesson> getGrammarsByLesson(
            @PathVariable String language,
            @PathVariable int lessonNumber) {

        Lesson grammars = service.getGrammarsByLesson(language, lessonNumber);
        return  ResponseEntity.ok(grammars);
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
