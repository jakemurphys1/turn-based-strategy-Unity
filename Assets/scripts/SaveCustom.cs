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
            public bool hired;
            public string weapon;
            public string armor;

            public Unit(string type)
            {
                this.type = type;
                this.unlocked = false;
                this.hired = false;
                this.level = 1;
                this.experience = 0;
                this.weapon = "";
                this.armor = "";
            }
        }

        [System.Serializable]
        public class Item
        {
            public string name;
            public bool unlocked;
            public bool bought;

            public Item(string name)
            {
                this.name = name;
                this.unlocked = false;
                this.bought = false;
            }
        }

        [System.Serializable]
        public class CustomData
        {

            public int gold;
            public List<Level> levels;
            public List<Unit> units;
            public List<Item> items;

            public CustomData()
            {
                gold = 150;

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
                items = new List<Item>() {
                    new Item ( "Potion Making" ),
                    new Item ( "Iron Forging" ),
                    new Item ( "Steel Forging" ),
                    new Item ( "Titanium Forging" ),
                    new Item ( "Sewing" ),
                    new Item ( "Advanced Sewing" ),
                    new Item ( "Silk Manufacturing" ),
                    new Item ( "Wand Making" ),
                    new Item ( "Advanced Wand Making" ),
                    new Item ( "Mastery of Wand Making" ),
                    new Item ( "Long Bow Building" ),
                    new Item ( "Elite Bow Building" ),
                    new Item ( "Master Bow Building" ),
                    new Item ( "Revive Potion Recipe" ),
                    new Item ( "Recover Potion Recipe" ),
                    new Item ( "Teleport Potion Recipe" ),
                    new Item ( "Defense Potion Recipe" ),
                    new Item ( "Resistance Potion Recipe" ),
                    new Item ( "Attack Potion Recipe" ),
                    new Item ( "Health Potion Recipe" ),
                    new Item ( "Accuracy Potion Recipe" ),
                    new Item ( "Evasion Potion Recipe" ),
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
