CREATE TABLE PROJECTS(
   id                VARCHAR(36)    NOT NULL PRIMARY KEY,
   userReference     VARCHAR(36)    NOT NULL,
   name              VARCHAR(256)   NOT NULL,
   toggles           TEXT           NOT NULL,
   isTest            INTEGER        NOT NULL DEFAULT 0,
   CONSTRAINT fk_userReference
      FOREIGN KEY(userReference) 
      REFERENCES USERS(id)
      ON DELETE CASCADE,
   CONSTRAINT unique_userReference_name
      UNIQUE(userReference,name)
);