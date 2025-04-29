
import Entry from '../Entities/Entry';
 // Adjust the path if necessary

interface EntryCardProps {
  entry: Entry;
  claseFondo?: string;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry}) => {
   
  return (
   
      
       <div className={`card card-item entry`}>
          <div className='entry-content'>
              <div className='entry-content-picture'>
              {entry.url_imagen && (
                 <img src={entry.url_imagen} alt={`Imagen de ${entry.word}`} />
                 )} 
                       </div>
              <div className='entry-content-data'>
                <div className='entry-content-data-main'>
                  <h1>{entry.word}</h1>
                  <div className='entry-content-translation'>
                    {entry.translation&&<h2>{entry.translation.join(', ')}</h2>}
                  </div>
                  <div className={`entry-type ${entry.type.toLowerCase()}`}>
                    {entry.type.toUpperCase()}
                  </div>
                </div>
                <div className='entry-content-data-pronunciation'>
                {entry.pronunciation&&<p>{entry.pronunciation.join(', ')}</p>}
                </div>
                <div className='entry-content-data-meaning'>
                  <p>{entry.meaning}</p>
                </div>
              </div>
            </div>
          
          </div>
    
    
  );
};

export default EntryCard;

