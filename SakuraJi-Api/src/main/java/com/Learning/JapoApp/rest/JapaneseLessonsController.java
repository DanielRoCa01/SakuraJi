package com.Learning.JapoApp.rest;

import com.Learning.JapoApp.entities.Entry;
import com.Learning.JapoApp.entities.Grammar;
import com.Learning.JapoApp.entities.Language;
import com.Learning.JapoApp.entities.Lesson;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class JapaneseLessonsController {


    private List<Lesson> lessons ;
    private List<Language> languages = new ArrayList<>();

    public JapaneseLessonsController() {

        cargarLenguajes();
    }

    private void cargarLecciones( String language) {
        ObjectMapper mapper = new ObjectMapper();
         lessons = new ArrayList<>();
        try {
            // Cargar desde resources usando ClassPathResource
            ClassPathResource resource = new ClassPathResource("languages/"+language+"/diccionario.json");
            lessons = mapper.readValue(resource.getInputStream(), new TypeReference<List<Lesson>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            lessons = Collections.emptyList();
        }
    }
    private void cargarLenguajes() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Cargar desde resources usando ClassPathResource
            ClassPathResource resource = new ClassPathResource("languages/languages.json");
            languages = mapper.readValue(resource.getInputStream(), new TypeReference<List<Language>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            languages = Collections.emptyList();
        }
    }



    @GetMapping("/{language}/{lessonNumber}/entries")
    public ResponseEntity<List<Entry>> getEntriesByLesson(
            @PathVariable String language,
            @PathVariable int lessonNumber,
            @RequestParam(required = false) String type) {
        cargarLecciones(language);
        List<Entry> entries = lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst()
                .map(l -> l.getEntries())
                .orElse(Collections.emptyList());

        List<Entry> filteredEntries = entries.stream()
                .filter(e -> type == null || e.getType().equals(type))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredEntries);
    }

    @GetMapping("/{language}/{lessonNumber}/grammars")
    public ResponseEntity<List<Grammar>> getGrammarsByLesson(@PathVariable String language,@PathVariable int lessonNumber) {
        cargarLecciones(language);
        return lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst()
                .map(l -> ResponseEntity.ok(l.getGrammars()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{language}/search")
    public ResponseEntity<List<Entry>> searchEntries(@PathVariable String language,@RequestParam String term) {
        cargarLecciones(language);
        List<Entry> resultados = lessons.stream()
                .flatMap(l -> l.getEntries().stream())
                .filter(e -> e.getWord().equals(term) ||
                        Arrays.stream(e.getTranslation()).anyMatch(t -> t.equalsIgnoreCase(term)) || // Check if any translation matches
                        Arrays.stream(e.getPronunciation()).anyMatch(p -> p.equals(term))) // check if any pronunciation matches
                .collect(Collectors.toList());

        return ResponseEntity.ok(resultados);
    }
    @GetMapping("/{language}/lessons")
    public ResponseEntity<List<Lesson>> getLessons(@PathVariable String language) {
        cargarLecciones(language);
        return ResponseEntity.ok(lessons);
    }
    @GetMapping("/languages")
    public ResponseEntity<List<Language>> getLanguages() {
        return ResponseEntity.ok(languages);
    }
    @GetMapping("/count")
    public ResponseEntity<Integer> getNumberOfLessons() {
        return ResponseEntity.ok(lessons.size());
    }
    @GetMapping("/{language}/appendix/{name}")
    public JsonNode getAppendix(@PathVariable String language,@PathVariable String name) throws Exception {
        // Carga el archivo JSON desde el classpath
        ClassPathResource resource = new ClassPathResource("languages/"+language+"/appendix/"+name+".json");
        String content = new String(Files.readAllBytes(Paths.get(resource.getURI())));
        // Usa ObjectMapper para convertir el contenido a JsonNode
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(content);
    }
}
