package mmgabri.services;

import java.util.List;

public interface Repository<E> {
    void save(E entity);

    List<E> getByEmail(String s);
}
