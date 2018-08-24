using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace BayatGames.SaveGameFree.Examples
{

    public class SaveCustom : MonoBehaviour
    {

        [System.Serializable]
        public struct Level
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
        public class CustomData
        {

            public int score;
            public int highScore;
            public List<Level> levels;

            public CustomData()
            {
                score = 0;
                highScore = 0;

                // Dummy data
                levels = new List<Level>() {
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false ),
                    new Level ( false, false )
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
            for(var i = 0;i< 8; i++)
            {
                print(customData.levels[i].unlocked);
            }
            
        }

    }

}
