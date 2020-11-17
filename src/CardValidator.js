import React, { useEffect, useState, useRef } from 'react';

const CardValidator = () => {
    const firstRender = useRef(true)
    const [cardInputError, setCardInputError] = useState(null)
    const [cardInput, setCardInput] = useState('');
    const [cardType, setCardType] = useState('');

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if(cardInput.substring(0, 2) === '34'|| cardInput.substring(0, 2) === '37') {
            setCardType('AMEX');
            if(cardInput.length !== 15) {
                setCardInputError('Card length must be 15');
                return;
            }
        } else if(cardInput.substring(0, 4) === '6011') {
            setCardType('Discover');
            if(cardInput.length !== 16) {
                setCardInputError('Card length must be 16');
                return;
            }
        } else if(cardInput.substring(0, 1) === '5' && 
        ['1', '2', '3', '4', '5'].includes(cardInput.substring(1, 2))) {
            setCardType('Mastercard');
            if(cardInput.length !== 16) {
                setCardInputError('Card length must be 16');
                return;
            }
        } else if(cardInput.substring(0, 1) === '4') {
            setCardType('Visa');
            if(cardInput.length !== 13 && cardInput.length !== 16) {
                setCardInputError('Card length must be 13 or 16');
                return;
            }
        } else {
            setCardInputError('Please enter a valid credit card');
            setCardType('');
            return;
        }

        const reversedCardInput = cardInput.split('').reverse().join('');
        let luhnSum = 0;

        for(let i = 0; i < reversedCardInput.length; i++) {
            let value = parseInt(reversedCardInput.charAt(i));
            if(i % 2 === 1) {
                value *= 2;
            }
            if(value > 9) {
                value -= 9;
            }
            luhnSum += value;
        }
        if (luhnSum % 10 === 0) {
            setCardInputError('');
        } else {
            setCardInputError('Please enter a valid credit card number');
        }
    }, [cardInput]);

    return (
        <div>
            <input
                type="number"
                name="cardInput"
                value={cardInput}
                onChange={e => setCardInput(e.target.value)}
            />
            <div>{cardType}</div>
            {cardInputError && (
                <p className="Error-message">{cardInputError}</p>
            )}
        </div>
    );
}

export default CardValidator;