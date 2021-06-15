enum CategoryType {
    WORD_GUESS = 'WORD_GUESS',
    COUNTRY_GUESS = 'COUNTRY_GUESS',
    FLAG_GUESS = 'FLAG_GUESS',
    MATH_GUESS = 'MATH_GUESS',
}

export default class CategoryModel {
    categoryId: number;
    categoryName: CategoryType;
    categoryTimer: number;
}
