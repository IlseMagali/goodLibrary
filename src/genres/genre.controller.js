const Genre = require('genre.model');

array = [
    '1',
    '2',
    '3',
]

// recibir un arreglo de ids de géneros y filtrar lo que no existan
async function findGenres (array) {
    if (!Array.isArray(array)) {
       return []; 
    }

    // recorrer el arreglo de ids para ver cuales existen y cuales no
    const genres = await Promise.all(array.map((id) => Genre.findById(id)));
    return genres.filter(g => g);


    // los que no existen no se toman en cuenta y los que sí, deberán agregarse
    // a un arreglo nuevo

    // si el arreglo viene vacío, deberá retornarse un arreglo vacío

    // es preferible crear un arreglo nuevo para guardar los géneros
    // que modificar el original

    // usar promise all para que al iterar sobre el arreglo no tenga que
    // esperarse a que verifique si un elemento del arreglo está ahí
    // para checar el siguiente.

    // retornar un arreglo de géneros para la creación del libro.
}

async function diffByGenresId(array, found){

    // array = [1,2, 3,4, 6, 7, 8, 7];
    // found = [{_id:1}, {_id:3}, {_id:4}];
    // array  ---- found

    const foundIds = {};

    found.forEach(genre => {
        foundIds[genre._id] = true;
    });

    // {1:true, 3:true, 4:true};

    const notFound = [];

    array.forEach(gId => {
        if (!foundIds[gId]) {
            notFound.push(gId);
        }
    });

    // notFound = [2, 6, 7, 8, 7]

    return {
        found,
        notFound
    };
}


