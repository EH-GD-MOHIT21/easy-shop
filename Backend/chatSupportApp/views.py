from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.conf import settings
import os
import datetime
from datetime import timezone
import json
from dukanAuthApp.models import User as User1
from .models import *
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def remove_queue(queue_obj1):
    queue_obj = Queue.objects.get(id = queue_obj1.id)
    queue_obj.delete()

def remove_queue1(user_obj):
    try:
        queue_obj = Queue.objects.get(user = user_obj)
        queue_obj.delete()
    except:
        pass

def create_queue(user_obj,grp_name):
    new_queue = Queue(
        user = user_obj,
        group_name = grp_name,
        joined_at = datetime.datetime.now(timezone.utc)
    )
    new_queue.save()
    queue_length = new_queue.id-Queue.objects.first().id
    return queue_length