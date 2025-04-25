package com.Learning.JapoApp.servicies;


import com.Learning.JapoApp.dao.LanguageRepository;
import com.Learning.JapoApp.entities.Entry;
import com.Learning.JapoApp.entities.Language;
import com.Learning.JapoApp.entities.Lesson;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

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

    public Lesson getEntriesByLesson(String language, int lessonNumber) {
        List<Lesson> lessons = cargarLecciones(language);
        Lesson lesson=lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst().get();
        lesson.setGrammars(new ArrayList<>());
        return lesson;
    }

    public Lesson getGrammarsByLesson(String language, int lessonNumber) {
        List<Lesson> lessons = cargarLecciones(language);

        Lesson lesson=lessons.stream()
                .filter(l -> l.getNumber() == lessonNumber)
                .findFirst().get();
        lesson.setEntries(new ArrayList<Entry>());
        return lesson;
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

