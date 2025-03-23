from flask import jsonify
from .models import Project, Measure
from . import db

# Function to fetch all projects and their associated measures
# TODO: maybe separate getting projects and their associated measures into different routes
def get_projects():
    # Query all projects
    projects = Project.query.all()
    
    # Prepare the list of projects with measures
    projects_data = []
    for project in projects:
        # For each project, get the associated measures
        measures = Measure.query.filter_by(project_id=project.id).all()
        # Prepare the project data with its measures
        project_data = {
            'id': project.id,
            'title': project.title,
            'status': project.status,
            'measures': [{'id': measure.id, 'measure_type': measure.measure_type, 'install_date': measure.install_date} for measure in measures]
        }
        projects_data.append(project_data)
    
    return jsonify(projects_data)
