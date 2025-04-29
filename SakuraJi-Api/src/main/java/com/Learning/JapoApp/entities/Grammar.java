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

        public String getSentence() {
            return sentence;
        }

        public void setSentence(String sentence) {
            this.sentence = sentence;
        }

        public String getSpelling() {
            return spelling;
        }

        public void setSpelling(String spelling) {
            this.spelling = spelling;
        }

        public String getTranslation() {
            return translation;
        }

        public void setTranslation(String translation) {
            this.translation = translation;
        }
    }
    public Grammar() {
    }

    public Grammar(String structure, String[] explanation, Example[] example) {
        this.structure = structure;
        this.explanation = explanation;
        this.example = example;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String[] getExplanation() {
        return explanation;
    }

    public void setExplanation(String[] explanation) {
        this.explanation = explanation;
    }

    public Example[] getExample() {
        return example;
    }

    public void setExample(Example[] example) {
        this.example = example;
    }
}
