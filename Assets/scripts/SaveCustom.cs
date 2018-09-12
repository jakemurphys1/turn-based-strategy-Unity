using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace BayatGames.SaveGameFree.Examples
{

    public class SaveCustom : MonoBehaviour
    {

        [System.Serializable]
        public class Level
        {
            public bool unlocked;
            public bool completed;

            public Level(bool unlocked, bool completed)
            {
                this.unlocked = unlocked;
                this.completed = completed;
            }
        }

        [System.Serializable]
        public class Unit
        {
            public string type;
            public int level;
            public int experience;
            public bool unlocked;
            public string weapon;
            public string armor;

            public Unit(string type)
            {
                this.type = type;
                this.unlocked = false;
                this.level = 1;
                this.experience = 0;
                this.weapon = "";
                this.armor = "";
            }
        }

        [System.Serializable]
        public class CustomData
        {

            public int gold;
            public List<Level> levels;
            public List<Unit> units;

            public CustomData()
            {
                gold = 0;

                levels = new List<Level>() {
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false )
                };
                units = new List<Unit>() {
                    new Unit ( "Soldier" ),
                    new Unit ( "Mage" ),
                    new Unit ( "Archer" ),
                    new Unit ( "Rogue" ),
                    new Unit ( "Templar" ),
                    new Unit ( "Archer" ),
                    new Unit ( "Soldier" ),
                    new Unit ( "Mage" ),
                    new Unit ( "Archer" ),
                    new Unit ( "Soldier" ),
                    new Unit ( "Mage" ),
                    new Unit ( "Archer" ),
                };
            }

        }

        public CustomData customData;
        public string identifier = "SaveCustom";

        public void Save()
        {
            SaveGame.Save<CustomData>(identifier, customData);
        }

        public void Load()
        {
            customData = SaveGame.Load<CustomData>(identifier,new CustomData());
        }

    }

}
