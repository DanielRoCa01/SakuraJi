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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public String[] getAppendixes() {
        return appendixes;
    }

    public void setAppendixes(String[] appendixes) {
        this.appendixes = appendixes;
    }

    public String[] getTypes() {
        return types;
    }

    public void setTypes(String[] types) {
        this.types = types;
    }

    public String getGreeting() {
        return greeting;
    }

    public void setGreeting(String greeting) {
        this.greeting = greeting;
    }
}
