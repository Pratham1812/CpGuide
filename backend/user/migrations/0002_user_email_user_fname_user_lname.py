# Generated by Django 4.2.3 on 2023-07-10 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='fname',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='lname',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]