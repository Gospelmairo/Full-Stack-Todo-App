from adrf.serializers import ModelSerializer
from .models import Task

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "completed", "created_at"]
