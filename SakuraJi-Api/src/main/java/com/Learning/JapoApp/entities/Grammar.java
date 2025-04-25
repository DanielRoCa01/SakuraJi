package com.Learning.JapoApp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class Grammar {
    private String structure;
    private String[] explanation;
    private Example[] example;


    @Setter
    @Getter
    public static class Example{


        private String sentence;
        private String spelling;
        private String translation;

        public Example(String translation, String sentence) {
            this.translation = translation;
            this.sentence = sentence;
        }
        public Example() {

        }

    }
    public Grammar() {
    }

    public Grammar(String structure, String[] explanation, Example[] example) {
        this.structure = structure;
        this.explanation = explanation;
        this.example = example;
    }

}
