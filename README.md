# DynamicOxygenCorrector
Project aimed at creating a digital twin of an oxygen corrector device.

# Setting up the Backend
This section provides instructions for setting up the backend of the DynamicOxygenCorrector project.

## Prerequisites
Before you begin, make sure you have the following prerequisites installed on your system:
- Python (version 3.9 or higher)
- Pip (Python package manager)

## Installation and Setup
1. Navigate to the "backend" directory of the project.
```bash
cd backend/
```
2. Create a virtual environment (optional but recommended).
```bash
python -m venv .venv
```
3. Activate the virtual environment.
```bash
source .venv/bin/activate
```
4. Install the required Python dependencies from the "requirements.txt" file.
```bash
pip install -r requirements.txt
```

## Running the Backend Server
To run the backend server, you can use Uvicorn, a lightweight ASGI server.
```bash
uvicorn main:app --reload
```
