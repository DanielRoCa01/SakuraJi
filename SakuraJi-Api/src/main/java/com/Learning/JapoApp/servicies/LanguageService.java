package com.Learning.JapoApp.servicies;


import com.Learning.JapoApp.dao.LanguageRepository;
import com.Learning.JapoApp.entities.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LanguageService {

    private final LanguageRepository repository;


    private List<Language> languages = new ArrayList<>();

    public LanguageService(LanguageRepository repository) {
        this.repository = repository;

    }

    public List<Lesson> cargarLecciones(String language) {

        return repository.cargarLecciones(language);
    }



    public List<Language> getLanguages() {
        return repository.cargarLenguajes();
    }

    public JsonNode getAppendix(String language, String appendixName) throws Exception {
        return repository.cargarAppendix(language,appendixName);
    }
    // En JapaneseLessonsService.java
    private static final Logger logger = LoggerFactory.getLogger(LanguageService.class);
    public PageResponse<Entry> getEntriesByLessons(
            String language,
            List<Integer> lessonNumbers,
            String type,
            int page,
            int size) {

        List<Lesson> lessons = cargarLecciones(language);
        List<Entry> filteredEntries = lessons.stream()
                .filter(l -> lessonNumbers.contains(l.getNumber()))
                .flatMap(l -> l.getEntries().stream())
                .filter(e -> type == null || e.getType().equals(type))
                .collect(Collectors.toList());

        int fromIndex = Math.min(page * size, filteredEntries.size());
        int toIndex = Math.min(fromIndex + size, filteredEntries.size());
        List<Entry> pagedEntries = filteredEntries.subList(fromIndex, toIndex);

        return new PageResponse<>(pagedEntries, page, size, filteredEntries.size());
    }
    public PageResponse<Grammar> getGrammarsByLesson(
            String language,
            List<Integer> lessonNumbers,
            int page,
            int size) {

        List<Lesson> lessons = cargarLecciones(language);
        List<Grammar> grammars = lessons.stream()
                .filter(l -> lessonNumbers.contains(l.getNumber()))
                .flatMap(l -> l.getGrammars().stream())
                .collect(Collectors.toList());
        logger.info("Grammars"+grammars);
        int fromIndex = Math.min(page * size, grammars.size());
        int toIndex = Math.min(fromIndex + size, grammars.size());
        List<Grammar> pagedGrammars = grammars.subList(fromIndex, toIndex);

        return new PageResponse<>(pagedGrammars, page, size, grammars.size());
    }


    // En JapaneseLessonsService.java

    public List<Entry> searchEntries(String language, String term) {
        List<Lesson> lessons = cargarLecciones(language);
        return lessons.stream()
                .flatMap(l -> l.getEntries().stream())
                .filter(e -> e.getWord().equals(term)
                        || Arrays.stream(e.getTranslation()).anyMatch(t -> t.equalsIgnoreCase(term))
                        || Arrays.stream(e.getPronunciation()).anyMatch(p -> p.equals(term)))
                .collect(Collectors.toList());
    }

}

