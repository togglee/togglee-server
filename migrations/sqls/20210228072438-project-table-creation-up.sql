CREATE TABLE PROJECTS(
   id                CHAR(36)    NOT NULL PRIMARY KEY,
   userReference     CHAR(36)    NOT NULL,
   name              CHAR(256)   NOT NULL,
   toggles           JSON        NOT NULL,
   isTest            INTEGER     NOT NULL DEFAULT 0,
   CONSTRAINT fk_userReference
      FOREIGN KEY(userReference) 
      REFERENCES USERS(id)
      ON DELETE CASCADE,
   CONSTRAINT unique_userReference_name
      UNIQUE(userReference,name)
);