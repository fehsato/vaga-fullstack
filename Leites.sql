PGDMP  $                     |            Leite    16.1    16.1 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24613    Leite    DATABASE     �   CREATE DATABASE "Leite" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Leite";
                postgres    false            �            1259    24614    leites    TABLE     X   CREATE TABLE public.leites (
    nome character varying(50),
    id integer NOT NULL
);
    DROP TABLE public.leites;
       public         heap    postgres    false            �            1259    24617    leites_id_seq    SEQUENCE     �   CREATE SEQUENCE public.leites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.leites_id_seq;
       public          postgres    false    215            �           0    0    leites_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.leites_id_seq OWNED BY public.leites.id;
          public          postgres    false    216                       2604    24618 	   leites id    DEFAULT     f   ALTER TABLE ONLY public.leites ALTER COLUMN id SET DEFAULT nextval('public.leites_id_seq'::regclass);
 8   ALTER TABLE public.leites ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �          0    24614    leites 
   TABLE DATA           *   COPY public.leites (nome, id) FROM stdin;
    public          postgres    false    215   �       �           0    0    leites_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.leites_id_seq', 33, true);
          public          postgres    false    216            �   �   x�m�M�0�u{�����,�W4q�fZ&P�*w�kp1m���{O�(�n �}`���5�&WE�U(���d���L�#�B�4"S��%���ߢt�!���ژ=%�ԋ�m�R����.��z��X���5�l���WΛ��f���8�_?�`�     