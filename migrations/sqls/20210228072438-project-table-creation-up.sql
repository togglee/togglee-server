CREATE TABLE PROJECTS(
   id       CHAR(36)    NOT NULL PRIMARY KEY,
   name     CHAR(256)   NOT NULL,
   user     CHAR(36)    NOT NULL,
   toggles  JSON        NOT NULL,
   isTest   INTEGER     NOT NULL DEFAULT 0,
   CONSTRAINT fk_user
      FOREIGN KEY(user) 
      REFERENCES USERS(id)
      ON DELETE CASCADE
);