from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Task
from .forms import TaskForm
from django.db import DatabaseError


def task_list(request):
    try:
        tasks = Task.objects.all()
    except DatabaseError as e:
        return HttpResponse(f"Error fetching tasks: {e}", status=500)
    return render(request, 'tasks/task_list.html', {'tasks': tasks})


def task_create(request):
    form = TaskForm(request.POST or None)
    if form.is_valid():
        try:
            form.save()
            return redirect('task_list')
        except DatabaseError as e:
            return HttpResponse(f"Error creating task: {e}", status=500)
    return render(request, 'tasks/task_form.html', {'form': form})


def task_update(request, pk):
    try:
        task = get_object_or_404(Task, pk=pk)
    except DatabaseError as e:
        return HttpResponse(f"Error fetching task: {e}", status=500)
    form = TaskForm(request.POST or None, instance=task)
    if form.is_valid():
        try:
            form.save()
            return redirect('task_list')
        except DatabaseError as e:
            return HttpResponse(f"Error updating task: {e}", status=500)
    return render(request, 'tasks/task_form.html', {'form': form})


def task_delete(request, pk):
    try:
        task = get_object_or_404(Task, pk=pk)
    except DatabaseError as e:
        return HttpResponse(f"Error fetching task: {e}", status=500)
    if request.method == 'POST':
        try:
            task.delete()
            return redirect('task_list')
        except DatabaseError as e:
            return HttpResponse(f"Error deleting task: {e}", status=500)
    return render(request, 'tasks/task_confirm_delete.html', {'task': task})



