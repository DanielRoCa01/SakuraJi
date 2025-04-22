package com.Learning.JapoApp.entities;

import lombok.Data;

@Data
public class Entry {
    private String type;
    private String word;
    private String translation;
    private String meaning;
    private String pronunciation;
    private String url_imagen;

    public Entry() {
    }

    public Entry(String type, String word, String translation, String meaning, String url_imagen, String pronunciation) {
        this.type = type;
        this.word = word;
        this.translation = translation;
        this.meaning = meaning;
        this.url_imagen = url_imagen;
        this.pronunciation = pronunciation;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }

    public String getUrl_imagen() {
        return url_imagen;
    }

    public void setUrl_imagen(String url_imagen) {
        this.url_imagen = url_imagen;
    }
}
