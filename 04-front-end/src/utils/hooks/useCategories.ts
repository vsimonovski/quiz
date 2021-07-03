import { useEffect, useState } from 'react';
import { Category } from '../../containers/Game/Game.type';
import { getAllCategories } from '../game.util';

function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories().then((res) => {
            if (res.status === 'ok') {
                const mappedCategories: Category[] = res.data.map(
                    (el: Category) => ({
                        categoryId: el.categoryId,
                        categoryName: el.categoryName.replace('_', ' '),
                        categoryTimer: el.categoryTimer,
                    })
                );
                setCategories(mappedCategories);
            }
        });
    }, []);

    return categories;
}

export default useCategories;
