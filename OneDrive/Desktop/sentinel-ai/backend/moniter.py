import psutil

def get_system_data():
    cpu = psutil.cpu_percent(interval=1)

    processes = []
    for p in psutil.process_iter(['pid', 'name']):
        processes.append(p.info)

    return {
        "cpu": cpu,
        "processes": processes[:5]  # limit for demo
    }