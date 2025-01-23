import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { FileUploadDropzone, FileUploadList, FileUploadTrigger } from '@/components/ui/file-upload'
import { toaster } from '@/components/ui/toaster'
import { formatter } from '@/helper/formatter'
import { Product } from '@/products.fetcher'
import { Box, FileUploadHiddenInput, FileUploadRootProvider, Flex, Heading, Input, Stack, useFileUpload } from '@chakra-ui/react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'

export const Route = createFileRoute('/product/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Omit<Product, 'id' | 'created_at'>>()

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    if (!fileUpload.acceptedFiles.length) return;
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("ean", data.ean)
    formData.append("price", data.price)
    formData.append("image", fileUpload.acceptedFiles[0])

    try {
      const response = await fetch('http://localhost:5000/products', {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        toaster.create({
          title: "Produto criado com sucesso",
          type: 'success',
          placement: 'top-end'
        })
        navigate({to: '/'})
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.create({
        title: "Não foi possível criar o produto",
        type: "error",
        placement: 'top-end'
      })
    }
  })

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 3000,
  })

  const currencyFormatter = formatter({
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseToNumber = (value: any) => {
    console.log()
    return parseFloat(value.replace(/\D/g, "")) / 100 || 0; // Parse formatted value back to number
  };

  return (
    <Flex justify="center" align="center">
      <Box p={6} w={{ base: "90%", sm: "400px" }}>
        <Heading color="blue.500" w="500px" mb="4">Cadastre um novo produto</Heading>
        <form onSubmit={onSubmit}>
          <Stack gap="4" textAlign="center" maxW="sm">
            <Field
              label="Nome do produto"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Input {...register("name", { required: "O nome do produto é obrigatório" })} />
            </Field>
            <Field
              label="EAN"
              invalid={!!errors.ean}
              errorText={errors.ean?.message}
            >
              <Input {...register("ean", {
                required: "O EAN do produto é obrigatório", validate: (value) => {
                  if (!/^[0-9]+$/.test(value)) {
                    return "EAN deve conter apenas números"
                  }
                  if (value.length > 14) {
                    return "EAN deve ter até 13 digitos"
                  }
                }
              })} />
            </Field>
            <Controller
              name="price"
              control={control}
              defaultValue={"0"}
              rules={{
                required: "O preço é obrigatório",
                validate: (value) => parseFloat(value) > 0 || "Preço precisa ser maior que 0",
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Field
                    label="preço"
                    invalid={!!error}
                    errorText={error?.message}
                  >
                    <Input
                      value={value !== undefined ? currencyFormatter.format(parseFloat(value)) : ""}
                      onChange={(e) => onChange(parseToNumber(e.target.value))}
                      placeholder="R$ 0,00"
                    />
                  </Field>
                </>
              )}
            />
            <Field
              invalid={!fileUpload.acceptedFiles.length}
              errorText="A imagem é obrigatória"
            >
              <FileUploadRootProvider value={fileUpload}>
                <FileUploadHiddenInput />
                <FileUploadTrigger asChild>
                  <FileUploadDropzone
                    w="100%"
                    label="Drag and drop here to upload"
                    description=".png, .jpg up to 3MB"
                  />
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRootProvider>
            </Field>
            <Flex w="100%" gap={2}>
              <Button type='submit' variant={'surface'} colorPalette={'blue'} flex="1">
                Cadastrar
              </Button>
              <Button variant={'surface'} colorPalette={'blue'} flex="1">
                <Link to="/" preload="intent">Cancelar</Link>
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}
