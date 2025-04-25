import React, { useEffect, useRef } from 'react';
import grammar from '../Entities/grammar';
import Grammar from '../Entities/Grammar';
 // Adjust the path if necessary

interface GrammarCardProps {
  grammar:Grammar
  
}

const GrammarCard: React.FC<GrammarCardProps> = ({ grammar}) => {
   
  return (
   
      
       <div className={`card card-item vocabulary`}>
          <div className='grammar-content'>
             
              <div className='grammar-content-data'>
              <h2>{grammar.structure}</h2>
                <div className='grammar-explanations'>
                  {grammar.explanation.map((explanation, index) => (
                    <div className='grammar-content-translation'  key={index}>
                      <p>{explanation}</p>
                    </div>
                  ))}
                  
                </div>
                <div className='grammar-examples'>
                {Array.isArray(grammar.example) && grammar.example.map((example, index) => (
                  <div className='grammar-content-translation' key={index}>
                    <div className='grammar-example'>
                      <div className='example-content'>
                        <p className='example-sentence'>{example.sentence}</p> 
                        <p className='example-hiragana'>{example.hiragana}</p>
                      </div>
                      <div className='example-translation'>
                        <p>{example.translation}</p>
                        
                      </div>
                    </div>
                    
                  </div>
                ))}
                  
                </div>
              </div>
            </div>
          
          </div>
    
    
  );
};

export default GrammarCard;

