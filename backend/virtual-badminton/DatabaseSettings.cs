﻿using System;
namespace virtual_badminton
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string UsersCollectionName { get; set; } = string.Empty;
        public string GamesCollectionName { get; set; } = string.Empty;
    }
}

