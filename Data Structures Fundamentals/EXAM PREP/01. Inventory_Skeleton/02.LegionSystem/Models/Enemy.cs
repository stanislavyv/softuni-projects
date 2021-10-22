namespace _02.LegionSystem.Models
{
    using System;
    using _02.LegionSystem.Interfaces;

    public class Enemy : IEnemy
    {
        public Enemy(int attackSpeed, int health)
        {
            this.AttackSpeed = attackSpeed;
            this.Health = health;
        }

        public int AttackSpeed { get; set; }

        public int Health { get; set; }

        public int CompareTo(object obj)
        {
            var other = (IEnemy)obj;

            if (this.AttackSpeed > other.AttackSpeed) { return 1; }
            if (this.AttackSpeed == other.AttackSpeed) { return 0; }

            return -1;
        }
        public int CompareTo(IEnemy other)
        {
            if (this.AttackSpeed > other.AttackSpeed) { return 1; }
            if (this.AttackSpeed == other.AttackSpeed) { return 0; }

            return -1;
        }
        public override bool Equals(object obj)
        {
            var other = obj as IEnemy;

            if (other != null)
            {
                return other.AttackSpeed == this.AttackSpeed;
            }

            return false;
        }
    }
}
