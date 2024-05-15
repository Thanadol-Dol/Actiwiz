from ..models.academic_model import DegreeEnum

def degree_sort(item):
    return DegreeEnum[item["departmentNode.DegreeENG"]].value

def extract_degree_thai(results):
    return [{"DegreeName": result["departmentNode.DegreeTH"]} for result in results]