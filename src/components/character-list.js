import React from 'react';
import _ from 'lodash';

import CharacterListItem from './character-list-item.js'

const CharacterList = props => {

    //console.log('CharacterList props.characteres', props.characters);    

    return (
        <div className="col-md-4">
            {_.map(props.characters, character => (
                <CharacterListItem
                    key={character.id}
                    character={character}
                    onCharacterSelect={props.onCharacterSelect} />
            ))}
        </div>
    );
};

export default CharacterList;
//lodash kütüphanesinin map fonksiyonu kullanıldı.ecmascript 6 map fonksiyonuda kullanılabilir