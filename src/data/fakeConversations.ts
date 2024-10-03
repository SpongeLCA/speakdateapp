import { fakeProfiles } from './fakeProfiles';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

export interface Conversation {
  id: string;
  profileId: string;
  messages: Message[];
}

const generateFakeMessages = (profileId: string): Message[] => {
  const profile = fakeProfiles.find(p => p.id === profileId);
  if (!profile) return [];

  const messages: Message[] = [
    {
      id: '1',
      text: `Salut ${profile.name} ! J'ai vu que tu aimais ${profile.interests[0]}. C'est vraiment cool !`,
      sender: 'me',
      timestamp: '10:30'
    },
    {
      id: '2',
      text: `Oui, j'adore ça ! Tu as déjà essayé ${profile.interests[1]} ?`,
      sender: 'other',
      timestamp: '10:32'
    },
    {
      id: '3',
      text: `Pas encore, mais ça m'intéresse beaucoup. Tu pourrais m'en dire plus ?`,
      sender: 'me',
      timestamp: '10:35'
    },
    {
      id: '4',
      text: `Bien sûr ! C'est une activité vraiment passionnante. D'ailleurs, j'ai vu que tu parlais ${profile.languages[0].language}. Tu l'as appris où ?`,
      sender: 'other',
      timestamp: '10:38'
    },
    {
      id: '5',
      text: `J'ai appris pendant mes voyages. D'ailleurs, j'ai vu que tu avais visité ${profile.travelExperience[0]}. Comment c'était ?`,
      sender: 'me',
      timestamp: '10:40'
    },
    {
      id: '6',
      text: `C'était incroyable ! J'ai adoré la culture et la nourriture. Tu devrais vraiment y aller si tu as l'occasion.`,
      sender: 'other',
      timestamp: '10:43'
    },
    {
      id: '7',
      text: `Ça me donne vraiment envie ! Au fait, j'ai vu que tu travaillais comme ${profile.occupation}. Ça te plaît ?`,
      sender: 'me',
      timestamp: '10:45'
    },
    {
      id: '8',
      text: `J'adore mon travail ! C'est vraiment passionnant et ça me permet de ${profile.personalityTraits[0]}.`,
      sender: 'other',
      timestamp: '10:48'
    },
    {
      id: '9',
      text: `Ça a l'air génial ! Dis, ça te dirait qu'on se rencontre pour en parler autour d'un café ?`,
      sender: 'me',
      timestamp: '10:50'
    },
    {
      id: '10',
      text: `Avec plaisir ! Que dirais-tu de demain après-midi ?`,
      sender: 'other',
      timestamp: '10:52'
    }
  ];

  return messages;
};

export const fakeConversations: Conversation[] = fakeProfiles.slice(0, 5).map(profile => ({
  id: `conv_${profile.id}`,
  profileId: profile.id,
  messages: generateFakeMessages(profile.id)
}));