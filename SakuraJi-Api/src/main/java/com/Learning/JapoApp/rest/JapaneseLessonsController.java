package com.Learning.JapoApp.rest;

import com.Learning.JapoApp.entities.Entry;
import com.Learning.JapoApp.entities.Grammar;
import com.Learning.JapoApp.entities.Lesson;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/japones")
@CrossOrigin(origins = "http://localhost:5173")
public class JapaneseLessonsController {


    private List<Lesson> lessons = new ArrayList<>();

    public JapaneseLessonsController() {
        cargarLecciones();
    }

    private void cargarLecciones() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Cargar desde resources usando ClassPathResource
            ClassPathResource resource = new ClassPathResource("diccionario.json");
            lessons = mapper.readValue(resource.getInputStream(), new TypeReference<List<Lesson>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            lessons = Collections.emptyList();
        }
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{lessonNumber}/entries")
    public ResponseEntity<List<Entry>> getEntriesByLesson(@PathVariable int lessonNumber) {
        return lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst()
                .map(l -> ResponseEntity.ok(l.getEntries()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{lessonNumber}/grammars")
    public ResponseEntity<List<Grammar>> getGrammarsByLesson(@PathVariable int lessonNumber) {
        return lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst()
                .map(l -> ResponseEntity.ok(l.getGrammars()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Entry>> searchEntries(@RequestParam String term) {
        List<Entry> resultados = lessons.stream()
                .flatMap(l -> l.getEntries().stream())
                .filter(e -> e.getWord().equals(term) ||
                        e.getTranslation().equalsIgnoreCase(term) ||
                        e.getPronunciation().equals(term))
                .collect(Collectors.toList());

        return !resultados.isEmpty() ?
                ResponseEntity.ok(resultados) :
                ResponseEntity.notFound().build();
    }
    @GetMapping("/lessons")
    public ResponseEntity<List<Lesson>> getLessons() {
        return ResponseEntity.ok(lessons);
    }
    @GetMapping("/count")
    public ResponseEntity<Integer> getNumberOfLessons() {
        return ResponseEntity.ok(lessons.size());
    }
}
