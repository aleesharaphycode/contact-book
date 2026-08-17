from django.contrib.auth.models import User

from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Contact
from .serializers import ContactSerializer, RegisterSerializer


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user
        )


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]