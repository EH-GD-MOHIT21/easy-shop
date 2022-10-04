from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_staffuser(self, username, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.staff = True
        user.superuser = True
        user.save(using=self._db)
        return user




class User(AbstractUser):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    middle_name = models.CharField(max_length=40,null=True,blank=True)
    username = models.CharField(max_length=20,unique=True)
    email = models.EmailField(unique=True)
    # password is default field
    phone_no = models.CharField(max_length=15)
    age = models.IntegerField(null=True,blank=True)
    country = models.CharField(max_length=40,null=True,blank=True)
    profile_pic = models.ImageField(null=True,blank=True,upload_to='imgs')
    gender = models.CharField(max_length=20,default='NA')
    two_factor_auth = models.BooleanField(default=False)
    # permissions
    superuser = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)

    # user manager
    objects = UserManager()

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_superuser(self):
        return self.superuser