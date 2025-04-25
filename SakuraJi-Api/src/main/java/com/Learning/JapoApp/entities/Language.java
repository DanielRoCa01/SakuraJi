package com.Learning.JapoApp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class Language {

    private String name;
    private int units;
    private String[] appendixes;
    private String[] types;
    private String greeting;

    public Language() {
    }

    public Language(String name, int units, String[] appendixes, String[] types, String greeting) {
        this.name = name;
        this.units = units;
        this.appendixes = appendixes;
        this.types = types;
        this.greeting = greeting;
    }

}
