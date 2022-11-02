package com.mmgabri.utils;

import java.util.*;
import java.util.stream.Collectors;

import static com.fasterxml.uuid.Generators.nameBasedGenerator;


public class Utils {

    public static UUID generateUUID (String id1, String id2){

        List<String> slist = Arrays.asList(id1, id2);
        List<String> sortedList = slist.stream().sorted().collect(Collectors.toList());
        UUID uuid = nameBasedGenerator().generate(sortedList.get(0) + sortedList.get(1));

        return uuid;
    }

    public static List<Integer> sortList (int num1, int num2){
        List<Integer> list = new ArrayList<>();
        list.add(num1);
        list.add(num2);
        Collections.sort(list);

        return list;
    }
}
