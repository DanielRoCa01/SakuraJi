package com.Learning.JapoApp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class Entry {
    private String type;
    private String word;
    private String[] translation;
    private String meaning;
    private String[] pronunciation;
    private String url_imagen;

    public Entry() {
    }

    public Entry(String type, String word, String[] translation, String meaning, String url_imagen, String[] pronunciation) {
        this.type = type;
        this.word = word;
        this.translation = translation;
        this.meaning = meaning;
        this.url_imagen = url_imagen;
        this.pronunciation = pronunciation;
    }

}
