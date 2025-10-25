const textProcessor = (algo, operation, input, options) => {

    if (typeof operation !== "boolean") 
    {
        
        throw new Error("InvalidType");
    }

    if (typeof input !== "string") 
    {
        throw new Error("InvalidType");
    }

    algo = algo.toLowerCase();

    
    if (algo !== "rle" && algo !== "caesar") {
        throw new Error("InvalidAlgorithm");
    }

    const RLEcomp = (input) => {
        let text = "";
        
        let nr = 1;

        for (let i = 1; i < input.length; i++) {
            if (input[i] === input[i - 1]) 
            {
                nr++;
            } else {
                text = text + nr + input[i - 1];
                nr = 1;
            }
        }
        text = text + nr + input[input.length - 1];
        return text;
    }

    const RLEdecomp = (input) => {
        let text = "";
        let caracter = "";
        let de_cate_ori = 0;
        let numberSTr = "";

        for (let i = 0; i < input.length; i++) 
        {
            if (!isNaN(input[i])) 
            {
                numberSTr += input[i];
            } else {
                if (numberSTr === "") 
                {
                    throw new Error("InvalidInput");
                }
                caracter = input[i];
                de_cate_ori = Number(numberSTr);

                for (let j = 0; j < de_cate_ori; j++) 
                {
                    text += caracter;
                }
                numberSTr = "";
            }
        }
        if (numberSTr !== "") throw new Error("InvalidInput");
        return text;
    }

    let shift;
    if (algo === "caesar") {
        if (!options || typeof options.shift !== "number") {
            throw new Error("InvalidInput");
        }
        shift = options.shift;
    }

    let shift;
    if (algo === "caesar") {
        if (!options || typeof options.shift !== "number") {
            throw new Error("InvalidInput");
        }
        shift = options.shift;
    }

    const ceaserComp = (input, shift) => {
        let letter_list = "abcdefghijklmnopqrstuvwxyz";
        let arr = [];
        let text = "";

        for (let i = 0; i < letter_list.length; i++) {
            arr.push(letter_list[i]);
        }

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < arr.length; j++) {

                let newIndex = -1;
                if (input[i] === " ") {
                    text += input[i];
                    break;
                }
                if (input[i] === arr[j]) {
                    newIndex = (j + shift) % 26;
                    text += arr[newIndex];
                    break;
                }
                if (input[i] === arr[j].toUpperCase()) {
                    newIndex = (j + shift) % 26;
                    text += arr[newIndex].toUpperCase();
                    break;
                }
            }
        }

        return text;
    }

    const ceaserDecomp = (input, shift) => {
        let letter_list = "abcdefghijklmnopqrstuvwxyz";
        let arr = [];
        let text = "";

        for (let i = 0; i < letter_list.length; i++) 
        {
            arr.push(letter_list[i]);
        }

        for (let i = 0; i < input.length; i++)
            {

            if (input[i] === " ") {
                text += input[i];
                continue;
            }

            for (let j = 0; j < arr.length; j++) 
            {

                
                let newIndex = -1;

                if (input[i] === arr[j])
                {

                    
                    newIndex = (j - shift + 26) % 26;
                    text += arr[newIndex];
                    break;
                }

                if (input[i] === arr[j].toUpperCase()) 
                {
                    newIndex = (j - shift + 26) % 26;
                    text += arr[newIndex].toUpperCase();
                    break;
                }
            }
        }

        return text;
    };

    switch (algo) {
        case "rle":
            if (typeof input !== "string" && input instanceof String === false)
            {
                throw new Error("InvalidType");
            }

            if (operation) {
                for (let i = 0; i < input.length; i++) 
                {
                    const char = input[i];
                    if (char >= '0' && char <= '9') {
                        throw new Error("InvalidInput");
                    }
                }
                return RLEcomp(input);
            } else {
                return RLEdecomp(input);
            }

        case "caesar":
            for (let i = 0; i < input.length; i++)
                {
                const char = input[i];
                if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' '))
                {
                    throw new Error("InvalidInput");
                }
            }

            if (operation) 
            {
                return ceaserComp(input, shift);
            } else {
                return ceaserDecomp(input, shift);
            }

        default:
            throw new Error("InvalidAlgorithm");
    }
}

module.exports = {
    textProcessor
}
