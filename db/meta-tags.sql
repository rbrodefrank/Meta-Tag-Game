-- CREATE DATABASE meta_tags;
USE meta_tags;

CREATE TABLE images (
  image_id int auto_increment not null,
  image_file_name varchar(50),
  PRIMARY KEY (image_id),
);

CREATE TABLE tags (
  tag_id int auto_increment not null,
  tag varchar(50),
  tag_accepted int,
  tag_rejected int,
  image_id int not null,
  PRIMARY KEY (tag_id),
  FOREIGN KEY (image_id),
);

CREATE TABLE suggested_tags (
  tag_id int auto_increment not null,
  tag varchar(50),
  image_id int not null,
  PRIMARY KEY (tag_id),
  FOREIGN Key (image_id),
)