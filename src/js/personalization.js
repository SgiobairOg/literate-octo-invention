/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 5/20/17.
 *
 * No license is granted for this project.
 */
class Personalized {
  constructor( locale = 'en' ) {
    switch( locale ) {
      case 'en':
      default:
        this.config = {
          salutations: {
            morning: 'Good morning from',
            midday: 'Hello from',
            evening: 'Good evening from',
            night: 'I can&apos;t sleep in'
          }
        };
        break;
      case 'de':
        this.config = {
          salutations: {
            morning: 'Guten morgen aus',
            midday: 'Wie geht&apos;s?',
            evening: 'Guten aben aus',
            night: 'Ich kann nicht schlafen'
          }
        };
        break;
      case 'nl':
        this.config = {
          salutations: {
            morning: 'Goedemorgen',
            midday: 'Hoe gaat het?',
            evening: 'Goedenavond',
            night: 'Ik kan niet slapen'
          }
        };
        break;
    };
      
    this.locale = locale;
    this.salutations = ;
  }
  timeOfDay() {
    const time = new Date();
    const hr = time.getHours();
    if ( hr < 4 || hr >= 23 ) {
      return 'night'
    } else if ( hr >= 4 && hr < 12 ) {
      return 'morning'
    } else if ( hr >= 12 && < 17 ) {
      return 'midday'
    } else {
      return 'evening'
    }
  }
  
  get greeting() {
    const time = this.timeOfDay();
    return this.config.salutations.time;
  }
}