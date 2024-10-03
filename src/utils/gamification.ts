export interface UserGamification {
    points: number;
    level: number;
    badges: string[];
  }
  
  export function calculateLevel(points: number): number {
    return Math.floor(Math.sqrt(points / 100)) + 1;
  }
  
  export function awardPoints(currentPoints: number, action: string): number {
    const pointsMap = {
      'daily_login': 10,
      'complete_profile': 50,
      'send_message': 5,
      'receive_like': 2,
      'match': 20,
    };
  
    return currentPoints + (pointsMap[action] || 0);
  }
  
  export function checkForNewBadges(user: UserGamification): string[] {
    const newBadges: string[] = [];
  
    if (user.points >= 1000 && !user.badges.includes('Socialite')) {
      newBadges.push('Socialite');
    }
  
    if (user.level >= 10 && !user.badges.includes('Expert')) {
      newBadges.push('Expert');
    }
  
    // Add more badge conditions here
  
    return newBadges;
  }